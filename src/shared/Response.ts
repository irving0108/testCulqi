export class HttpResponse {
    static defineResponse(statusCode = 502, message = {}) {
      return {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Methods': '*',
          'Access-Control-Allow-Origin': '*',
        },
        statusCode,
        body: JSON.stringify({ status_code: statusCode, message }),
      };
    }
  
    static _200(message = {}) {
      return this.defineResponse(200, message);
    }
  
    static _204(message = {}) {
      return this.defineResponse(204, message);
    }
  
    static _400(message = {}) {
      return this.defineResponse(400, message);
    }
  
    static _401(message = {}) {
      return this.defineResponse(400, message);
    }
  
    static _412(message = {}) {
      return this.defineResponse(412, message);
    }
  
    static _404(message = {}) {
      return this.defineResponse(404, message);
    }
  
    static _custom(statusCode = 400, message = {}) {
      return this.defineResponse(statusCode, message);
    }
}