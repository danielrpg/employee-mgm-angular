import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../shared/employee';
import { EmployeeRestApiService } from '../shared/employee-rest-api.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {

  employeeId: number;
  employee = new Employee();

  constructor(private activatedRoute: ActivatedRoute, 
              private employeeApi: EmployeeRestApiService) { }

  ngOnInit(): void {
    this.employeeId = +this.activatedRoute.snapshot.paramMap.get("id");
    this.loadEmployee(this.employeeId);
    // console.log(id);;

    // this.activatedRoute.params.subscribe((data) => {
    //   this.employeeId = data.id;
    //   this.loadEmployee(this.employeeId);
    // });
  }

  loadEmployee(id: number): void {
    this.employeeApi.getEmployeeById(id).subscribe((data: Employee) => {
      this.employee = data;
      //console.info(data as Employee);
    });
    // this.employeeApi.getSingleEmployee(id).subscribe(data => {
    //   this.employee = data;
    // })
  }
}
