\echo 'Delete and recreate jobly db?'
\prompt 'Return for yes or control-C to cancel > ' foo


DROP DATABASE express_jobly ;
CREATE DATABASE express_jobly;
\connect express_jobly

\i jobly-schema.sql
\i jobly-seed.sql

\echo 'Delete and recreate jobly_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo



\i jobly-schema.sql
