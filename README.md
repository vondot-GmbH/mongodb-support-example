# mongodb-support-example

## start the project

```
npm i
```

```
npm run start
```

## routes

As an example I created 2 routes for you. 
One With the aggregation pipeline and one with mongoose populate



### with-aggregate

This is the same example as in the mongoose playground. 
This works

```
GET http://localhost:3000/training-plans/with-aggregate
```

### with-mognoose

As already described I have exactly this problem here that the language fields are not available in the result.

```
GET http://localhost:3000/training-plans/with-mognoose
```

