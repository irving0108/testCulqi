import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  GetCommandInput,
  GetCommandOutput,
  PutCommand,
  PutCommandInput,
  PutCommandOutput,
  QueryCommand,
  QueryCommandInput,
  QueryCommandOutput,
} from "@aws-sdk/lib-dynamodb";

class DynamoDBUtil {
  private readonly dynamoDBDocumentClient: DynamoDBDocumentClient;

  constructor() {
    this.dynamoDBDocumentClient = DynamoDBDocumentClient.from(
      new DynamoDBClient({})
    );
  }

  async getItem(tableName: string, key: object): Promise<GetCommandOutput> {
    console.log(`Init process of obtain Item in table:  ${tableName}`);

    const params: GetCommandInput = {
      TableName: tableName,
      Key: key,
    };
    return await this.dynamoDBDocumentClient.send(new GetCommand(params));
  }

  async queryByIndex(tableName: string, indexName: string, key: string, source: string) {
    const params: QueryCommandInput = {
      TableName: tableName,
      IndexName: indexName,
      KeyConditionExpression: '#source = :source',
      Limit: 1,
      ScanIndexForward: false,
      ExpressionAttributeValues: {
        ':source': source
      },
      ExpressionAttributeNames: {
        '#source': `${key}`
      }
    };
    return await this.dynamoDBDocumentClient.send(new QueryCommand(params));
  }

  async getItems(
    queryCommandInput: QueryCommandInput
  ): Promise<QueryCommandOutput> {
    console.log(`Init process of obtain Items in table:  ${queryCommandInput.TableName}`);

    return await this.dynamoDBDocumentClient.send(
      new QueryCommand(queryCommandInput)
    );
  }

  async putItem(
    tableName: string,
    item: object,
    conditionExpression?: string,
    expressionAttributeNames?: Record<string, any>
  ): Promise<PutCommandOutput> {
    console.log(`Init process of put Item in table:  ${tableName}`);
    const params: PutCommandInput = {
      TableName: tableName,
      Item: item,
      ConditionExpression: conditionExpression,
      ExpressionAttributeNames: expressionAttributeNames,
    };
    return await this.dynamoDBDocumentClient.send(new PutCommand(params));
  }
}

export default new DynamoDBUtil();