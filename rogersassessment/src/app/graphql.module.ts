import {NgModule} from '@angular/core';
import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import {ApolloClientOptions, ApolloLink, InMemoryCache} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';
import { setContext } from "@apollo/client/link/context";
import { environment } from "../environments/environment";
import { onError } from '@apollo/client/link/error';

const link = onError(({ graphQLErrors, networkError, response }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
    )
    if(response) {
      response.errors = undefined
    }
 
  if (networkError) console.log(`[Network error]: ${networkError}`)
})

const uri = `https://graphql.contentful.com/content/v1/spaces/${environment.contentful.space}`;
export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {

  // Set authentication header
  const auth = setContext((operation, context) => {
    return {
      headers: {
        Authorization: `Bearer ${environment.contentful.accessToken}`,
      },
    };
  });

  return {
    link: ApolloLink.from([auth, link, httpLink.create({ uri })]),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
