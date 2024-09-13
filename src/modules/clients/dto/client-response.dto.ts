export class ClientResponse {
  id: string;
  name: string;

  constructor(partial: Partial<ClientResponse>) {
    Object.assign(this, partial);
  }
}
