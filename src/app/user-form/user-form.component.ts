import { Component } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {

  public postJsonValue: any;

  diabetes_prediction!: any;
  probability!: any;

  formData = {
    patientId: 0,
    pregnancies: 10,
    plasmaGlucose: 104,
    diastolicBloodPressure: 51,
    tricepsThickness: 7,
    serumInsulin: 24,
    bmi: 27.36983156,
    diabetesPedigree: 1.3504720469999998,
    age: 43
  };

  constructor(private http: HttpClient) {

  }

  public postMethod() {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer sXIw0JFsCEz00Wh7PMVqVHn5OGh4wJQt`,
      })
    };

    let body = {
      "Inputs": {
        "input1":
          [
            { "PatientID": this.formData.patientId,
              "Pregnancies": this.formData.pregnancies,
              "PlasmaGlucose": this.formData.plasmaGlucose,
              "DiastolicBloodPressure": this.formData.diastolicBloodPressure,
              "TricepsThickness": this.formData.tricepsThickness,
              "SerumInsulin": this.formData.serumInsulin,
              "BMI": this.formData.serumInsulin,
              "DiabetesPedigree": this.formData.diabetesPedigree,
              "Age": this.formData.age }
            ]
          },
      "GlobalParameters":  {}
    };

    this.http.post('http://5cd5afc1-f22f-4557-be5c-7635b5ae26f0.westeurope.azurecontainer.io/score', body, httpOptions).pipe(
      catchError((error) => {
        console.error('Wystąpił błąd:', error);
        return of(null);
      })
    ).subscribe(
      (data) => {
        console.log(data);
          this.postJsonValue = data?.valueOf();

          this.diabetes_prediction = this.postJsonValue['Results']['WebServiceOutput0'][0]['DiabetesPrediction'];
          this.probability = this.postJsonValue['Results']['WebServiceOutput0'][0]['Probability'];

          //console.log("Daibetes prediction: ", this.diabetes_prediction);
          //console.log("Probability: ",this.probability);
      }
    );
  }

  submitForm() {
    this.postMethod();
    //console.log(this.formData);
  }
}
