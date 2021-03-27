import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Inject } from '@nestjs/common';
import { Stonk } from '../../core/model/stock.model';
import {
  IStonkService,
  IStonkServiceProvider,
} from '../../core/primaty-ports/stock.service.interface';

@WebSocketGateway()
export class StonkGateway implements OnGatewayConnection {
  constructor(
    @Inject(IStonkServiceProvider) private stonkService: IStonkService,
  ) {}

  @WebSocketServer() server;

  async handleConnection(client: any, ...args: any[]): Promise<any> {
    client.emit('allStonks', await this.stonkService.getStonks());
  }
  @SubscribeMessage('update')
  async handleUpdateEvent(
    @MessageBody() stonk: Stonk,
    @ConnectedSocket() socket: Socket,
  ): Promise<void> {
    try {
      const stonkUpdate = await this.stonkService.updateStonk(stonk);
      this.server.emit('updateStonk', stonkUpdate);
    } catch (e) {
      socket.error(e.message);
    }
  }

  @SubscribeMessage('getStonk')
  async handleGetEvent(
    @MessageBody() name: string,
    @ConnectedSocket() socket: Socket,
  ): Promise<void> {
    try {
      const stonk = await this.stonkService.getById(name);
      socket.emit('stonk', stonk);
    } catch (e) {
      socket.error(e.message);
    }
  }

  @SubscribeMessage('createStonk')
  async handleCreateEvent(
    @MessageBody() stonk: Stonk,
    @ConnectedSocket() socket: Socket,
  ): Promise<void> {
    try {
    } catch (e) {
      socket.error(e.message);
    }
  }

  @SubscribeMessage('deleteStonk')
  async handleDelete(
    @MessageBody() stonk: Stonk,
    @ConnectedSocket() socket: Socket,
  ): Promise<void> {
    try {
    } catch (e) {
      socket.error(e.message);
    }
  }
}
