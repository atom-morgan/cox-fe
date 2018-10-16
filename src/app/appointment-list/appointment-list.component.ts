import { Component, OnInit, ViewChild } from '@angular/core';
import { AppointmentsService } from '../services/appointments/appointments.service';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.scss']
})
export class AppointmentListComponent implements OnInit {
  @ViewChild('appointmentForm') modalForm;
  appointments = [];
  appointment;
  isModalVisible = false;
  dataError = false;

  constructor(private appointmentsService: AppointmentsService) { }

  ngOnInit() {
    this.fetchAppointments();
  }

  openAppointmentModal(start) {
    this.appointment = this.appointments.find((app) => {
      return start === app.startTime;
    });
    this.isModalVisible = true;
  }

  closeAppointmentModal() {
    this.isModalVisible = false;
    this.appointment = undefined;
  }

  onSubmit(newAppointment) {
    this.appointment.name = newAppointment.name;
    this.appointment.phone = newAppointment.phone;
    this.appointmentsService.update(this.appointment).subscribe(res => {
      this.closeAppointmentModal();
      this.modalForm.resetForm();
      this.fetchAppointments();
    });
  }

  fetchAppointments() {
    this.appointmentsService.getAll().subscribe(res => {
      this.appointments = res;
    }, err => {
      this.dataError = true;
    });
  }

}
