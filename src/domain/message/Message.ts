import { Entity } from '@shared/core/Entity';

import { Body } from './Body';
import { Email } from './Email';
import { Subject } from './Subject';

type AddressResponse = {
  name: string;
  email: string;
};

type Address = {
  name: string;
  email: Email;
};

type MessageProps = {
  body: Body;
  recipient: Address;
  subject: Subject;
  from: Address;
};

class Message extends Entity<MessageProps> {
  private constructor(props: MessageProps, id?: string) {
    super(props, id);
  }

  get recipient(): AddressResponse {
    const { email, name } = this._props.recipient;

    return {
      name,
      email: email.value,
    };
  }

  get from(): AddressResponse {
    const { email, name } = this._props.from;

    return {
      name,
      email: email.value,
    };
  }

  get body(): string {
    return this._props.body.value;
  }

  get subject(): string {
    return this._props.subject.value;
  }

  static build(props: MessageProps, id?: string): Message {
    return new this(props, id);
  }
}

export { Message };
