import { print } from 'graphql';

class LogFunctionExtension {
  constructor(logFunction) {
    this.logFunction = logFunction;
  }

  requestDidStart(options) {
    const { queryString, variables, operationName, parsedQuery } = options;
    const loggedQuery = queryString || print(parsedQuery);
    const log = `[QUERY]: ${loggedQuery}; [OPERATION NAME]: ${operationName}; [VARIABLES]: [${JSON.stringify(variables)}]`;
    this.logFunction.info(log);
    
    return (...errors) => {
      // If there are no errors, we log in willSendResponse instead.
      if (errors.length) {
        this.logFunction.error(JSON.stringify(errors));
      }
    };
  }

  parsingDidStart() {
    this.logFunction.info('Parsing Start');
    return () => {
      this.logFunction.info('Parsing End');
    };
  }

  validationDidStart() {
    this.logFunction.info('Validation Start');
    return () => {
      this.logFunction.info('Validation End');
    };
  }

  executionDidStart() {
    this.logFunction.info('Execution Start');
    return () => {
      this.logFunction.info('Execution End');
    };
  }

  willSendResponse = (o) => {
    const log = `[RESPONSE DATA]: ${JSON.stringify(o.graphqlResponse)}`;
    this.logFunction.info(log);
  }
}

export default LogFunctionExtension;
