This query is a simple use case, but too heavy.(cost=1886261)

```graphql
# x-hasura-role: user
# x-hasura-user-id: 99f530a2-cee9-44f8-b0f9-ecf44a2ff3e8

query HeavyQuery {
  SubTask(limit: 10) {
    name
    body
    id
    SubTaskAssignees{
      User {
          name
        }
    }
    Task {
      name
      TaskAssignees{
        User {
          name
        }
        
      }
    }
  }
}

# Aggregate  (cost=1886261.79..1886261.80 rows=1 width=32)
#   ->  Limit  (cost=171606.34..1886261.66 rows=10 width=32)
#        ->  Nested Loop Left Join  (cost=171606.34..74759112.82 rows=435 width=32)
#              ->  Nested Loop Left Join  (cost=79848.90..34844607.11 rows=435 width=112)
#                   ->  Seq Scan on "SubTask"  (cost=0.00..68844.40 rows=435 width=96)
```


# Reproduce

```
docker-compose up
npm i
npm run hasura-migrate && npm run hasura-metadata
npm run generate-permission && npm run hasura-metadata
# Run bbove query in Hasura console.
```
