const crypto = require("crypto");
const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

function computeHash(data) {
  return crypto.createHash("sha3-512").update(data).digest("hex");
}

function stringifyCandidate(candidate) {
  return typeof candidate === "string" ? candidate : JSON.stringify(candidate);
}

function getCandidate(event) {
  if (event && event.partitionKey) return event.partitionKey;

  if (event) return computeHash(JSON.stringify(event));

  return TRIVIAL_PARTITION_KEY;
}

function deterministicPartitionKey(event) {
  let candidate = getCandidate(event);

  candidate = stringifyCandidate(candidate);

  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = computeHash(candidate);
  }

  return candidate;
}

module.exports = {
  deterministicPartitionKey,
  MAX_PARTITION_KEY_LENGTH,
};