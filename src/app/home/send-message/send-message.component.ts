import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Message } from 'src/app/models/Message';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { MessageService } from 'src/app/services/message-service/message.service';

@Component({
	selector: 'app-send-message',
	templateUrl: './send-message.component.html',
	styleUrls: ['./send-message.component.css']
})
export class SendMessageComponent implements OnInit {

	public form: FormGroup = new FormGroup({});

	public sender: string = "";
	public senderId: number | null = null;

	constructor(
		private messageService: MessageService,
		private toast: ToastrService,
		private authService: AuthService,
		private formBuilder: FormBuilder,
		private router: Router,
		private datePipe: DatePipe
	) { }

	ngOnInit(): void {
		if (this.authService.activeUser) {
			this.sender = this.authService.activeUser.username;
			this.senderId = this.authService.activeUser.id;
		}
		this.form = this.formBuilder.group({
			sender: [this.sender],
			receiver: ["CustomerSupportIP"],
			content: [null, Validators.required]
		});
	}

	public sendMessage() {
		let content = this.form.value.content;
		let currentDateTime = this.datePipe.transform((new Date), 'MM/dd/yyyy h:mm:ss');
		let message = new Message(content, this.senderId, currentDateTime);

		if (content == null) {
			this.toast.warning("Unesite tekst poruke!");
		}
		else {
			this.messageService.insert(message).subscribe({
				next: () => {
					this.toast.success("Poruka je uspješno poslana!");
					this.router.navigate(['/home']);
				},
				error: () => {
					this.toast.error("Došlo je do greške prilikom slanja poruke! Pokušajte ponovo.");
				}
			});
		}
	}
}
