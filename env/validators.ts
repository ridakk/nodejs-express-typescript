import { str } from 'envalid';

export default {
  // put env validations here
  // Envalid parses NODE_ENV automatically, so no need to put it here
  DUMMY: str(),
};
