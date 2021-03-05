/**
 * Read an environment variable
 * @param _name The name of the environment variable
 * @param fallback Fallback value
 */
export default function env(_name: string, fallback?: any): any {
  return process.env[_name] ?? fallback;
};

/**
 * Read an environment variable and parse it into an integer.
 * Returns undefined if the varibale is not set or not a
 * valid integer
 * @param _name The name of the variable
 * @param fallback Fallback value
 */
env.int = (_name: string, fallback?: number): number | undefined => {
  return Number.isNaN(Number.parseInt(env(_name, fallback))) ? undefined : Number.parseInt(env(_name, fallback));
};

/**
 * Read an environment variable and parse it into a floating
 * point number. Returns undefined if the variable is unset
 * or not a valid float
 * @param _name The name of the environment variable
 * @param fallback Fallback value
 */
env.float = (_name: string, fallback?: number): number | undefined => {
  return Number.isNaN(Number.parseFloat(env(_name, fallback))) ? undefined : Number.parseFloat(env(_name, fallback));
};

/**
 * Read an environment variable and parse it into a boolean value
 * @param _name The name of the environment variable
 * @param fallback Fallback value
 */
env.boolean = (_name: string, fallback?: boolean): boolean | undefined => {
  return env(_name) === 'true' ? true : (env(_name) === 'false' ? false : (fallback ?? undefined));
};
