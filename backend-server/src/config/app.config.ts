
const currentEnv: string = process.env.APP_ENV || 'development';
const port: number|string = process.env.APP_PORT || 5000;
const baseUrl: string = process.env.APP_URL || `http://localhost:${port}/`;
const apiVersion: string = 'api/v1/';
const dbName: string = process.env.MONGODB_DATABASE_NAME || 'device_manager';
const mongoUri = `mongodb://mongo:27017/${dbName}`;

const errorMessageList :any = {
    required: 'Please enter the :attribute',
    unique: 'The :attribute has already been taken.',
    max: 'The :attribute may not be greater than :max.',
    min: 'The :attribute must be at least :min.',
    maxAmount: 'The :attribute may not be greater than :max.',
    numeric: 'The :attribute must be a number.',
    valueIn: 'Please :attribute should in [:in].',
    regex: ':attribute value not in the right format.',
    exists: 'The :attribute value is not available in the database',
    isIpv4: 'Please provide a valid IPv4 address.',
    uniqueUID: 'The UID has already been taken.',
};

export {
    currentEnv,
    port,
    baseUrl,
    apiVersion,
    mongoUri,
    errorMessageList
}