--How many tasks are in the task table?
SELECT COUNT(*) AS tasks_total
FROM task;

--How many tasks in the task table do not have a valid due date?
SELECT COUNT(*) AS invalid_due_date_count
FROM task
WHERE DATETIME(due_date) IS NULL
   OR DATE(SUBSTR(due_date, 1, 10), '+0 days') IS NOT SUBSTR(due_date, 1, 10);

--Find all the tasks that are marked as done.
SELECT task.*
FROM task
JOIN status ON task.status_id = status.id
WHERE status.name = 'Done';

--Find all the tasks that are not marked as done.
SELECT task.*
FROM task
JOIN status ON task.status_id = status.id
WHERE status.name != 'Done';

--Get all the tasks, sorted with the most recently created first.
SELECT *
FROM task
ORDER BY created DESC, id DESC;

--Get the single most recently created task.
SELECT *
FROM task
ORDER BY created DESC, id DESC
LIMIT 1;

--Get the title and due date of all tasks where the title or description contains database.
SELECT title, due_date
FROM task
WHERE LOWER(title) LIKE '%database%'
   OR LOWER(description) LIKE '%database%';

--Get the title and status (as text) of all tasks.
SELECT task.title, status.name AS status
FROM task
JOIN status ON task.status_id = status.id;

--Get the name of each status, along with a count of how many tasks have that status.
SELECT status.name, COUNT(task.id) AS task_count
FROM status
LEFT JOIN task ON status.id = task.status_id
GROUP BY status.id, status.name;

--Get the names of all statuses, sorted by the status with most tasks first.
SELECT status.name
FROM status
LEFT JOIN task ON status.id = task.status_id
GROUP BY status.id, status.name
ORDER BY COUNT(task.id) DESC, status.name ASC;
