import * as AWS from 'aws-sdk'

const docClient = new AWS.DynamoDB.DocumentClient()

export const putItem = async (
  params: AWS.DynamoDB.DocumentClient.PutItemInput
): Promise<void> => {
  await docClient.put(params).promise()
}

export const getItem = async <T>(
  params: AWS.DynamoDB.DocumentClient.GetItemInput
): Promise<T | undefined> => {
  const output = await docClient.get(params).promise()
  return output.Item as T | undefined
}
