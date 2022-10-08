import {
  interfaces,
  controller,
  httpGet,
} from 'inversify-express-utils';

@controller('/health')
class HealthController implements interfaces.Controller {
  @httpGet('/')
  private async healthCheck() {
    return { message: 'up and running' };
  }
}