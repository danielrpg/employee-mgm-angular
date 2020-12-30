import { Component, OnInit } from '@angular/core';
import { EmployeeRestApiService } from '../shared/employee-rest-api.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees: any = [];
  constructor(private empRestApi: EmployeeRestApiService) { }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    return this.empRestApi.getEmployees().subscribe((data: {}) => {
      this.employees = data;
    });
  }
  
  removeEmployee(id: number) {
    if (window.confirm('Are you sure, you want to delete?')){
      this.empRestApi.deleteEmployee(id).subscribe((data: {}) => {
        this.loadEmployees();
      })
    }
  }
}
