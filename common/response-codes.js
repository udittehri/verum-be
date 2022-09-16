
class ResponseCodeService {
  getCode(code) {
    const responseObj = [
      {
        code: 200,
        name: "OK",
        description: "All right!"
      },
      {
        code: 201,
        name: "CREATED",
        description: "Resource was created successfully."
      },
      {
        code: 204,
        name: "UPDATED",
        description: "Resource updated successfully."
      },
      {
        code: 400,
        name: "BAD_REQUEST",
        description: "Client Error."
      },
      {
        code: 404,
        name: "NOT_FOUND",
        description: "The resource you are requesting does not exist."
      },
      {
        code: 500,
        name: "INTERNAL_SERVER_ERROR",
        description: "An error occured on the server which was not the consumer's fault."
      }
    ];

    return responseObj.find(function (response) { return response.code === code; });
  }
}

module.exports = new ResponseCodeService();