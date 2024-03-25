import { Injectable } from '@nestjs/common';
import { PubSub } from '@google-cloud/pubsub';

@Injectable()
export class PubSubService {
  private readonly pubsub: PubSub;
  credentials = {
    "type": "service_account",
    "project_id": "hackathon-fiap-ponto",
    "private_key_id": "62b32961fa2abb9ec28d4c3379dd8fefbc02f334",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDHlyX2AJu2wekk\nIWnueNxO2fOfs9Cvo9SKFS68jnwao6y+OWgNrKrFCamlDjfKmi05owWbPXCBheC1\ngOvtw+yAkpXdxF/hUIOH7fPbqpOx3806EzMksUl0h0tpK2zAZcflglRn068dp+xI\n3xjnvEK4JbafocNmTvdtKpTkUY46z22dkxEqAPmQvb4WpMeG3ApiivbcHUVD/Gju\nVUwLHFnIZTc1itW7jGsv62e3NKFLpZqTxUbwYGOWzd8h9hLyykiqUfxSWHUkUswW\nrEJSTLZEhfs1tb/XuI8juKsSbmSt+oif7gDCdqdFR+UwjdEAP4kSO7nYTG7XfYCi\nX2jvxrx3AgMBAAECggEAJ5h3SfX17kxK3cWZN9uXTTdU6x5nrKiSTjCEnJihy0Ek\nUHqgB3J1UHCpzJpk/BcZGMGcJ5+JNdDi8u8YHwvK2/j4rU27fb4U0f8lbTNKaLPP\nCZHsh/955JnAnqUkRokKnp/78bsflwEM0aoczUBedhzZPZMAakgJMwmLDz6Uulq5\nEtyfMZLqBQigli9n0bka2X5fxRhKITDa4whVqeuO2pPRsXp1CtmpJ5towCYQEZ56\nXMVjkl9whDo9HrUNWnAS+WgczRicctQknIvavgOaZrnw7tBApTWdnMzz/vunl09y\n/shu5jhArT0lZqzsDygijsEYTmtlpMvIy1whqBlv8QKBgQD8zj4UPGzCQ8a4PITh\nxvIWKG9GrWPyNYvp9oK5rmazEjWzmD496WQad3AgQ8zUvbEJoZgzo1r0y0RHFzAL\nvKZgbFl1D9C0lZTzmZKJODBrga5WWhqvhxdClXnkXVU2GaqKfOtx3/KM+VvH/pAr\nz6A6yixidZPPUKQQKomHGUW4cQKBgQDKHMTgIynMpAgIXcCtJetrY57E+c5HshVo\niJHJowxAoEHhLPbuX00vT6uU4XdyxjLx0Oom7TqeJXTzsL9QC41ZXJjSIxE8qkGw\n+hVqRAOSpxyvF3Wz5APDOCOvzJ//h9uUR09bBKzc9lfTXHSySsbUTcvr5b6ZC4Cn\nubC1Ak13ZwKBgQCLpbnxH7fMT/gzyWp19ZnA17EwT5OINkAFi6CGxWoBvStg+9ZW\nCNi9LgEIMauyUN68vUEANVqHIsmio5JsyVb2qKN54LSfLInNTqX9msZUfJw7Iybe\nkzcsFrnwhgYODnuAaKT+kIDBkvU6MsqdCOIv14JRGTX/LUKTk4vIzxMOYQKBgDSk\nlasDvaltuCHluX/f9pe8FOidYFtQST83AzIP4+sZUs+B1Ld13zbJe5mFuIUOlsph\nbfvBopj6jKHEkbAZsjFqauug8qZoej/Mg7NwD7YtDM2WQLQgWdKJVtI9bBc0nb7b\nbBH6/8N17p5A4Kxnya4WrVy+NIzMcDA/r4UWGnNVAoGBAIZKasoHVqgc6eQX6gzK\n4W8hz2ke+/Wm9C2aDJQ2slFAyx5VJuc7Ubo0Q3LEJMBFui/dVLnLuDXlGUc0NXTX\nE1QLU4/BQOZAfej2mqW4kzTc51ri9V5CSvLBSSMEp9VvaJvR4CxsRJsdnsl54+OW\nlC5WXNLC8GBFaz8QWRsqamKC\n-----END PRIVATE KEY-----\n",
    "client_email": "hackathon-ponto@hackathon-fiap-ponto.iam.gserviceaccount.com",
    "client_id": "110365735050520580907",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/hackathon-ponto%40hackathon-fiap-ponto.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
    };
  constructor() {
    this.pubsub = new PubSub({
      projectId: 'hackathon-fiap-ponto',
      credentials: this.credentials,
    });
  }

  async publishMessage(topicName: string, data: any): Promise<string> {
    try {
      if (!topicName) {
        throw new Error('Topic name cannot be null or undefined');
      }

      if (!data) {
        throw new Error('Data cannot be null or undefined');
      }

      //Publish message in topic
      const bufferData = Buffer.from(JSON.stringify(data));
      const messageId = await this.pubsub
        .topic(topicName)
        .publishMessage({ data: bufferData });

      return messageId;
    } catch (error) {
      console.error(`Error publishing message: ${error.message}`);
      throw error;
    }
  }

  async subscribe(
    topicName: string,
    messageHandler: (message) => void,
  ): Promise<void> {
    const subscriptionName = topicName;

    const subscription = this.pubsub.subscription(subscriptionName);

    //Listen subscription events
    subscription.on('message', (message) => {
      try {
        messageHandler(message);
        message.ack();
      } catch (error) {
        console.error(`Error processing message: ${error}`);
        message.nack();
      }
    });

    //Handle subscription errors
    subscription.on('error', (error) => {
      console.error(`Subscription error: ${error}`);
    });
  }
}