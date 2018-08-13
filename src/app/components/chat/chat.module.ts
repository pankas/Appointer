import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatService } from './chat.service';
import { ChatDialogComponent } from './chat-dialog/chat-dialog.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from "@angular/router";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([{
      path: "",
      component: ChatDialogComponent
    }
    ])
  ],
  declarations: [ChatDialogComponent],
  providers: [ChatService]
})
export class ChatModule { }
