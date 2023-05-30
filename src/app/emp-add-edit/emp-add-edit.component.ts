import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss']
})
export class EmpAddEditComponent implements OnInit {
  empForm: FormGroup;

  education: string[] = [
    'Matric',
    'Diploma',
    'Intermediate',
    'Graduate',
    'Post Graduate'
  ]

  constructor(
    private _fb: FormBuilder,
    private _empService: EmployeeService,
    private _coreService: CoreService,
    private _dialogRef: MatDialogRef<EmpAddEditComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.empForm = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: '',
      education: '',
      company: '',
      experience: '',
      package: ''
    })
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data)
  }

  onFormSubmit() {
    if (this.data) {
      // update data
      this._empService.updateEmployee(this.data.id, this.empForm.value).subscribe({
        next: (val: any) => {
          this._dialogRef.close(true)
          this._coreService.openSnackBar('Employee updated')
        },
        error: (err: any) => {
          console.error(err)
        }
      })
    } else {
      // add data
      if (this.empForm.valid)
        console.log(this.empForm.value)
      this._empService.addEmpoyee(this.empForm.value).subscribe({
        next: (val: any) => {
          this._dialogRef.close(true)
          this._coreService.openSnackBar('Employee added')
        },
        error: (err: any) => {
          console.error(err)
        }

      })
    }
  }

}
