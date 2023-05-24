import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from "@angular/forms";
import { EntryFormErrorMessages } from "./entry-form-error-messages";
import { EntryFactory } from "../shared/entry-factory";
import { EntryService } from "../shared/entry.service";
import { Entry } from "../shared/entry";
import { Rating } from "../shared/rating";
import {RatingFactory} from "../shared/rating-factory";

@Component({
  selector: "bs-entry-form",
  templateUrl: "./entry-form.component.html",
  styles: [`

    h1 {
      font-size: 45px;
      /*font-family: Ayuthaya,sans-serif;*/
      margin-bottom: 5px;
    }

    .orange {
      border-color: #ff8000;
      border-width: medium;
      margin-bottom: 50px;
    }


  `]
})

export class EntryFormComponent implements OnInit {
  entryForm: FormGroup;
  entry = EntryFactory.empty();
  errors: { [key: string]: string } = {};
  isUpdatingEntry = false;
  ratings: FormArray;
  //Padlet Id mitgeben/speichern
  padletId: number = 0;


  constructor(
    private fb: FormBuilder,
    private bs: EntryService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.entryForm = this.fb.group({});
    this.ratings = this.fb.array([]);
  }

  ngOnInit() {
    const id = this.route.snapshot.params["id"];
    //Padlet Id mitgeben/speichern
    this.padletId = this.route.snapshot.queryParams["padletId"];
    if (id) {
      this.isUpdatingEntry = true;
      this.bs.getSingle(id).subscribe(entry => {
        this.entry = entry;
        this.initEntry();
      });
    }
    this.initEntry();
  }

  initEntry() {
    this.buildRatingsArray();
    this.entryForm = this.fb.group({
      id: this.entry.id,
      entry_text: [this.entry.entry_text, Validators.required],
      padlet_id: this.entry.padlet_id,
      rating: 0,
      comment: ''
    });
    this.entryForm.statusChanges.subscribe(() =>
      this.updateErrorMessages());
  }


  buildRatingsArray() {
    if (this.entry.ratings) {
      this.ratings = this.fb.array([]);
      for (let rati of this.entry.ratings) {
        let fg = this.fb.group({
          id: new FormControl(rati.id), //this.fb.control(img.id),
          rating: new FormControl(rati.rating),
          comment: new FormControl(rati.comment),
          username: new FormControl(rati.username, [Validators.required])
        });
        this.ratings.push(fg);
      }
    }
  }



  submitForm() {

    const entry: Entry = EntryFactory.fromObject(this.entryForm.value);
    //Ratings auf Formular rausholen

    if (this.entryForm.get('rating')?.value || this.entryForm.get('comment')?.value) {
      const ratingFormData = {
        rating: this.entryForm.get('rating')?.value ?? '',
        comment: this.entryForm.get('comment')?.value ?? '',
        username: sessionStorage.getItem("userId") // TODO edit wen login is working //ändern
      }
      const rating: Rating = RatingFactory.fromObject(ratingFormData);
      if(this.entry.ratings) {
        //neues Rating in Ratings Array hinzufügen
        entry.ratings = [...this.entry.ratings, rating];
      } else {
        entry.ratings = [rating];
      }
    }

    console.log(entry);
    //Padlet Id mitgeben/speichern
    if(this.padletId && this.padletId >= 0){
      entry.padlet_id = this.padletId;
    }
    if (this.isUpdatingEntry) {
      this.bs.update(entry).subscribe(res => {
        // ["../../entries", entry.id] - !!!!!!!!!!!!!! ändern auf entry Seiten Eintrag
        this.router.navigate(["../../padlets", entry.padlet_id], {
          relativeTo: this.route
        });
      });
    } else {
      //padlet.user_id = 1; // just for testing
      console.log(entry);
      this.bs.create(entry).subscribe(res => {
        console.log(entry);
        this.entry = EntryFactory.empty();
        this.entryForm.reset(EntryFactory.empty());
        // ["../entries"]
        this.router.navigate(["../padlets", entry.padlet_id], {relativeTo: this.route});
      });
    }
  }


  updateErrorMessages() {
    console.log("Is invalid? " + this.entryForm.invalid);
    this.errors = {};
    for (const message of EntryFormErrorMessages) {
      const control = this.entryForm.get(message.forControl);
      if (
        control &&
        control.dirty &&
        control.invalid && control.errors &&
        control.errors[message.forValidator] &&
        !this.errors[message.forControl]
      ) {
        this.errors[message.forControl] = message.text;
      }
    }

  }

  removeEntry() {
    if (confirm('Möchtest du den Entry wirklich löschen?')) {
      this.bs.remove(this.entry.id)
        .subscribe((res:any) => this.router.navigate(['../padlets', this.entry.padlet_id], { relativeTo:
          this.route }));
    }
  }








}
