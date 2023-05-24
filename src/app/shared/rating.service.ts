import { Injectable } from '@angular/core';
import {Padlet, User, Entry} from "./padlet";
import {HttpClient} from "@angular/common/http";
import {Observable,throwError } from "rxjs";
import {catchError, retry} from 'rxjs/operators';
@Injectable()
export class RatingService {

}
