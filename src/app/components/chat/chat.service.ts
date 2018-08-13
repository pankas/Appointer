import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiAiClient } from 'api-ai-javascript';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';   


export class Message{
	constructor(public content: string, public sentBy: string){

	}
}
@Injectable()
export class ChatService {

	readonly token = environment.dialogflow.Chatagent;
	readonly client = new ApiAiClient({accessToken: this.token});

	conversation = new BehaviorSubject<Message[]>([]);
  constructor() { }

  // Add message to the source
  update(msg: Message){
  	this.conversation.next([msg]);

  }

  converse(msg: string){
  	const userMessage = new Message(msg, 'user');
  	this.update(userMessage);

  	return this.client.textRequest(msg)
  		.then( res => {
  			console.log(res);
  			const speech = res.result.fulfillment.speech;
        console.log(speech);
  			const botMessage = new Message(speech, 'bot');
  			this.update(botMessage);


  		})
  }

  
}
