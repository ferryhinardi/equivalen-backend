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
    // Parsing Start
    return () => {
      // Parsing End
    };
  }

  validationDidStart() {
    // Validation Start
    return () => {
      // Validation End
    };
  }

  executionDidStart() {
    // Execution Start
    return () => {
      // Execution End
    };
  }

  willSendResponse = (o) => {
    const log = `[RESPONSE DATA]: ${JSON.stringify(o.graphqlResponse)}`;
    this.logFunction.info(log);
  }

  willResolveField = () =>
    (error) => {
      if (error) {
        this.logFunction.error(`[ERROR]: ${JSON.stringify(error)}`);
      }
    }
}

export default LogFunctionExtension;
