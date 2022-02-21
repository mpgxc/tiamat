type Address = {
  email: string;
  name: string;
};

type Message = {
  to: Address;
  from: Address;
  subject: string;
  body: string;
};

interface IMailProvider {
  sendMail(message: Message): Promise<void>;
}

export { Address, IMailProvider, Message };
