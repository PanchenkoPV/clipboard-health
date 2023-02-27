const { deterministicPartitionKey, MAX_PARTITION_KEY_LENGTH } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("returns '0' if no event is provided", () => {
    const result = deterministicPartitionKey();
    expect(result).toEqual("0");
  });

  it("returns the partition key if provided in the event", () => {
    const event = { partitionKey: "my-key" };
    const result = deterministicPartitionKey(event);
    expect(result).toEqual("my-key");
  });

  it("generates a deterministic partition key from the event data if no partition key is provided", () => {
    const event = { data: "my-data" };
    const result1 = deterministicPartitionKey(event);
    const result2 = deterministicPartitionKey(event);
    expect(result1).toEqual(result2);
  });

  it("truncates the partition key if it is longer than the maximum length", () => {
    const event = { data: "a".repeat(360) };
    const result = deterministicPartitionKey(event);
    expect(result).toHaveLength(MAX_PARTITION_KEY_LENGTH / 2);
  });

  it("always returns a string value for the partition key", () => {
    const event = { data: 123 };
    const result = deterministicPartitionKey(event);
    expect(typeof result).toEqual("string");
  });
});
