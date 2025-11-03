---
{"publish":true,"title":"PostgreSQL","created":"2024-11-20 07:52","modified":"2025-11-03T20:43:24.535+01:00","tags":["computer-science/databases/sql/postgresql"],"cssclasses":""}
---


# POSTGRESQL

---

PostgreSQL is a free and open-source relational database management system emphasising extensibility and SQL compliance.

## Commands

- Enter Postgres as the root user

```bash
sudo -u postgres psql
```

- List all databases

```PostgreSQL
\l
```

- Drop specific database

```PostgreSQL
DROP DATABASE db_name;
```

- Connect to a database

```PostgreSQL
\c db_name
```

- List all tables in current database

```PostgreSQL
\dt
```

- Describe table structure

```PostgreSQL
\d table_name
```

- List all users/roles

```PostgreSQL
\du
```

- Exit PostgreSQL

```PostgreSQL
\q
```

## Creating Users and Databases

```bash
# Create a new user
sudo -u postgres createuser --interactive

# Create a new database
sudo -u postgres createdb db_name

# Grant privileges to user
sudo -u postgres psql
GRANT ALL PRIVILEGES ON DATABASE db_name TO username;
```

## Common SQL Commands

### Create Table

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Insert Data

```sql
INSERT INTO users (username, email)
VALUES ('john_doe', 'john@example.com');
```

### Query Data

```sql
-- Select all
SELECT * FROM users;

-- Select with condition
SELECT username, email FROM users WHERE id = 1;

-- Join tables
SELECT u.username, o.order_date
FROM users u
JOIN orders o ON u.id = o.user_id;
```

### Update Data

```sql
UPDATE users
SET email = 'newemail@example.com'
WHERE username = 'john_doe';
```

### Delete Data

```sql
DELETE FROM users WHERE id = 5;
```

## Backup and Restore

### Backup

```bash
# Backup single database
pg_dump db_name > backup.sql

# Backup all databases
pg_dumpall > all_backup.sql

# Backup with compression
pg_dump -Fc db_name > backup.dump
```

### Restore

```bash
# Restore from SQL file
psql db_name < backup.sql

# Restore from compressed dump
pg_restore -d db_name backup.dump
```

## Configuration

PostgreSQL configuration files are typically located in `/etc/postgresql/[version]/main/`:

- `postgresql.conf`: Main configuration
- `pg_hba.conf`: Client authentication

### Allow Remote Connections

Edit `postgresql.conf`:

```
listen_addresses = '*'
```

Edit `pg_hba.conf`:

```
host    all             all             0.0.0.0/0            md5
```

Restart PostgreSQL:

```bash
sudo systemctl restart postgresql
```

## Performance Tuning

### Key Configuration Parameters

```sql
-- Show current settings
SHOW shared_buffers;
SHOW effective_cache_size;

-- View active queries
SELECT pid, usename, state, query
FROM pg_stat_activity
WHERE state != 'idle';

-- Kill long-running query
SELECT pg_terminate_backend(pid);
```

### Indexes

```sql
-- Create index
CREATE INDEX idx_users_email ON users(email);

-- Create unique index
CREATE UNIQUE INDEX idx_users_username ON users(username);

-- Drop index
DROP INDEX idx_users_email;
```

## Advanced Features

### JSON Support

```sql
-- Create table with JSON column
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    data JSONB
);

-- Insert JSON data
INSERT INTO events (data)
VALUES ('{"name": "login", "user_id": 123}');

-- Query JSON data
SELECT data->>'name' FROM events WHERE data->>'user_id' = '123';
```

### Full-Text Search

```sql
-- Create text search vector
ALTER TABLE articles ADD COLUMN tsv tsvector;

UPDATE articles SET tsv = to_tsvector('english', title || ' ' || content);

-- Search
SELECT * FROM articles WHERE tsv @@ to_tsquery('postgresql & tutorial');
```

### Views

```sql
-- Create view
CREATE VIEW active_users AS
SELECT * FROM users WHERE last_login > NOW() - INTERVAL '30 days';

-- Query view
SELECT * FROM active_users;
```

## Advantages

- **ACID compliance**: Full transaction support
- **Extensibility**: Custom functions, data types, operators
- **JSON support**: Native JSONB type for document storage
- **Full-text search**: Built-in text search capabilities
- **Concurrency**: MVCC for high performance
- **Open source**: Free with active community

---

## References

- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [PostgreSQL Tutorial](https://www.postgresqltutorial.com/)
- [psql Command Reference](https://www.postgresql.org/docs/current/app-psql.html)
