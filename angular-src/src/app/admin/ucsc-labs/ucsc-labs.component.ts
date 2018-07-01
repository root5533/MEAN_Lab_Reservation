import { Component, OnInit, ViewChild } from '@angular/core';
import { BackEndService } from "../../services/back-end.service";
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ValidatorService } from "../../services/validator.service";

@Component({
  selector: 'app-ucsc-labs',
  templateUrl: './ucsc-labs.component.html',
  styleUrls: ['./ucsc-labs.component.scss']
})
export class UcscLabsComponent implements OnInit {

  labs: any;
  selectedLab: any;
  overlayValue: boolean;
  labForm: FormGroup;
  previewLab: any;

  @ViewChild('create_lab') public popover: NgbPopover;
  @ViewChild('delete_lab') public popoverDelete: NgbPopover;
  @ViewChild('update_lab') public popoverUpdate: NgbPopover;

  constructor( private backend: BackEndService, private fb: FormBuilder, public snackBar: MatSnackBar, private validator: ValidatorService) {

    this.labForm = fb.group({
      'name': [null, Validators.compose([Validators.required, this.validator.noWhitespaceValidator])],
      'description': [null, Validators.compose([Validators.required, this.validator.noWhitespaceValidator])],
      'capacity': [null, Validators.required]
    });

  }

  ngOnInit() {
    this.loadLabs();
  }

  loadLabs() {
    this.backend.getLabs().subscribe((res) => {
      if (res) {
        this.labs = res['labs'];
      }
    });
  }

  labSelect(lab) {
    if (lab._id == this.selectedLab) {
      this.selectedLab = null;
    } else {
      this.selectedLab = lab._id;
      this.previewLab = {
        name: lab.name,
        description: lab.description,
        capacity: lab.capacity
      }
    }
  }

  overlay(value) {
    this.overlayValue = value;
  }

  popoverClose() {
    this.popover.close();
  }

  popoverDeleteClose() {
    this.popoverDelete.close();
  }

  popoverUpdateClose() {
    this.popoverUpdate.close();
  }

  createLab(value) {
    this.labForm.reset();
    const lab = {
      name: value.name,
      description: value.description,
      capacity: value.capacity
    }
    this.backend.createNewLab(lab).subscribe((res) => {
      if (res['success']) {
        this.openSnackBar(res['msg'], 'NEW');
        this.loadLabs();
      } else {
        this.openSnackBar(res['msg'], 'FAILED');
      }
    });
    this.popoverClose();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  deleteLab() {
    this.backend.deleteLab(this.selectedLab).subscribe((res) => {
      if (res['success']) {
        this.openSnackBar(res['msg'], 'DELETE');
        this.loadLabs();
        this.popoverDeleteClose();
        this.selectedLab = null;
      } else {
        this.openSnackBar(res['msg'], 'FAILED');
      }
    })
  }

  createBtnClick() {
    this.labForm.reset();
  }

  updateBtnClick() {
    this.labForm.reset();
    this.labForm.setValue(this.previewLab);
    this.labForm.patchValue(this.previewLab);
  }

  updateLab(value) {
    const lab = {
      id: this.selectedLab,
      name: value.name,
      description: value.description,
      capacity: value.capacity
    }
    this.backend.updateLab(lab).subscribe((res) => {
      if (res['success']) {
        this.openSnackBar(res['msg'], 'UPDATE');
        this.labForm.reset();
        this.popoverUpdateClose();
        this.loadLabs();
        this.selectedLab = null;
      } else {
        this.openSnackBar(res['msg'], 'FAILED');
      }
    })
  }

}
