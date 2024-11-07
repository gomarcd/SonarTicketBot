
# Example payload

When a Sonar webhook fires due to a new IP assignment being created, the payload worker needs to handle looks like this:

```
{
  "event": "ipassignment.created",
  "object_id": 3207,
  "current": {
    "id": 3207,
    "created_at": "2024-11-06T23:30:57+00:00",
    "updated_at": "2024-11-06T23:30:57+00:00",
    "description": null,
    "ip_pool_id": 8,
    "ipassignmentable_id": 424,
    "ipassignmentable_type": "Account",
    "reference": null,
    "soft": false,
    "subnet": "10.0.2.9/32",
    "subnet_id": 9
  },
  "triggered_at": "2024-11-06 23:30:59.968026"
}
```

# Example test query

To test the worker locally, use an example query like this:

```
curl -X POST "http://127.0.0.1:8787" `
  -H "Content-Type: application/json" `
  -d "{""event"": ""ipassignment.created"", ""object_id"": 3207, ""current"": {""id"": 3207, ""created_at"": ""2024-11-06T23:30:57+00:00"", ""updated_at"": ""2024-11-06T23:30:57+00:00"", ""description"": null, ""ip_pool_id"": 8, ""ipassignmentable_id"": 424, ""ipassignmentable_type"": ""Account"", ""reference"": null, ""soft"": false, ""subnet"": ""10.0.2.9/32"", ""subnet_id"": 9}, ""triggered_at"": ""2024-11-06 23:30:59.968026""}"

```