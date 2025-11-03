---
{"publish":true,"title":"Many To Many Relationship","created":"2025-10-24T00:00:00.000Z","modified":"2025-11-03T20:43:47.216+01:00","tags":["computer-science/databases/modeling/many-to-many"],"cssclasses":"center-images"}
---


# MANY TO MANY RELATIONSHIP

---

A many-to-many relationship is a type of numerical relationship (cardinality) in data modelling, where multiple instances of one entity can be associated with multiple instances of another entity. This differs from one-to-one or one-to-many relationships.

## Key Characteristics

- **Multiple Associations:** Each instance of entity A can be related to multiple instances of entity B, and vice versa.
- **Junction Table:** Typically implemented using a junction table (also known as an associative entity or bridge table).

## Example

A student can enroll in multiple courses, and a course can have multiple students enrolled. This requires a junction table to manage the associations.

## Common Use Cases

- **Product Categories:** A product can belong to multiple categories, and a category can contain multiple products.
- **Project Memberships:** A project can involve multiple people, and a person can work on multiple projects.
- **Student Courses**: Students enrol in multiple courses; courses have multiple students
- **Tags/Labels**: Articles can have multiple tags; tags can be on multiple articles
- **Actors and Movies**: Actors appear in multiple films; films feature multiple actors

## Database Implementation

### Without Junction Table (Problematic)

Storing multiple relationships in a single column leads to data anomalies:

```sql
-- BAD DESIGN: Violates first normal form
CREATE TABLE students (
    student_id INT PRIMARY KEY,
    name VARCHAR(100),
    courses VARCHAR(500)  -- "CS101, CS102, MATH201" - DON'T DO THIS!
);
```

### With Junction Table (Correct)

```sql
-- Table 1: Students
CREATE TABLE students (
    student_id INT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100)
);

-- Table 2: Courses
CREATE TABLE courses (
    course_id INT PRIMARY KEY,
    course_name VARCHAR(100),
    credits INT
);

-- Junction Table: Enrollments
CREATE TABLE enrollments (
    enrollment_id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    enrollment_date DATE,
    grade VARCHAR(2),
    FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (course_id) REFERENCES courses(course_id),
    UNIQUE KEY unique_enrollment (student_id, course_id)
);
```

## SQL Queries

### Insert Data

```sql
-- Insert students
INSERT INTO students (student_id, name, email) VALUES
(1, 'Alice Johnson', 'alice@example.com'),
(2, 'Bob Smith', 'bob@example.com'),
(3, 'Carol White', 'carol@example.com');

-- Insert courses
INSERT INTO courses (course_id, course_name, credits) VALUES
(101, 'Introduction to Computer Science', 3),
(102, 'Data Structures', 4),
(201, 'Calculus I', 4);

-- Create enrollments (many-to-many relationships)
INSERT INTO enrollments (student_id, course_id, enrollment_date) VALUES
(1, 101, '2025-01-15'),
(1, 102, '2025-01-15'),
(2, 101, '2025-01-16'),
(2, 201, '2025-01-16'),
(3, 102, '2025-01-17'),
(3, 201, '2025-01-17');
```

### Query Relationships

```sql
-- Find all courses for a specific student
SELECT c.course_name, c.credits, e.enrollment_date
FROM enrollments e
JOIN courses c ON e.course_id = c.course_id
WHERE e.student_id = 1;

-- Find all students in a specific course
SELECT s.name, s.email, e.enrollment_date
FROM enrollments e
JOIN students s ON e.student_id = s.student_id
WHERE e.course_id = 101;

-- Count enrollments per course
SELECT c.course_name, COUNT(e.student_id) as num_students
FROM courses c
LEFT JOIN enrollments e ON c.course_id = e.course_id
GROUP BY c.course_id, c.course_name;

-- Find students taking more than 2 courses
SELECT s.name, COUNT(e.course_id) as num_courses
FROM students s
JOIN enrollments e ON s.student_id = e.student_id
GROUP BY s.student_id, s.name
HAVING COUNT(e.course_id) > 2;
```

## Python Implementation with SQLAlchemy

```python
from sqlalchemy import create_engine, Column, Integer, String, Date, ForeignKey, Table
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, sessionmaker
from datetime import date

Base = declarative_base()

# Junction table
enrollments = Table('enrollments', Base.metadata,
    Column('student_id', Integer, ForeignKey('students.student_id'), primary_key=True),
    Column('course_id', Integer, ForeignKey('courses.course_id'), primary_key=True),
    Column('enrollment_date', Date),
    Column('grade', String(2))
)

class Student(Base):
    __tablename__ = 'students'

    student_id = Column(Integer, primary_key=True)
    name = Column(String(100))
    email = Column(String(100))

    # Many-to-many relationship
    courses = relationship('Course', secondary=enrollments, back_populates='students')

    def __repr__(self):
        return f"<Student(name='{self.name}')>"

class Course(Base):
    __tablename__ = 'courses'

    course_id = Column(Integer, primary_key=True)
    course_name = Column(String(100))
    credits = Column(Integer)

    # Many-to-many relationship
    students = relationship('Student', secondary=enrollments, back_populates='courses')

    def __repr__(self):
        return f"<Course(name='{self.course_name}')>"

# Example usage
if __name__ == "__main__":
    # Create database
    engine = create_engine('sqlite:///school.db')
    Base.metadata.create_all(engine)

    Session = sessionmaker(bind=engine)
    session = Session()

    # Create students
    alice = Student(student_id=1, name='Alice Johnson', email='alice@example.com')
    bob = Student(student_id=2, name='Bob Smith', email='bob@example.com')

    # Create courses
    cs101 = Course(course_id=101, course_name='Intro to CS', credits=3)
    cs102 = Course(course_id=102, course_name='Data Structures', credits=4)
    math201 = Course(course_id=201, course_name='Calculus I', credits=4)

    # Establish many-to-many relationships
    alice.courses.append(cs101)
    alice.courses.append(cs102)
    bob.courses.append(cs101)
    bob.courses.append(math201)

    # Add to session and commit
    session.add_all([alice, bob, cs101, cs102, math201])
    session.commit()

    # Query relationships
    print("Alice's courses:")
    for course in alice.courses:
        print(f"  - {course.course_name}")

    print("\nStudents in CS101:")
    for student in cs101.students:
        print(f"  - {student.name}")

    session.close()
```

## Django ORM Example

```python
from django.db import models

class Student(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()

    # Many-to-many relationship
    courses = models.ManyToManyField('Course', through='Enrollment')

    def __str__(self):
        return self.name

class Course(models.Model):
    course_name = models.CharField(max_length=100)
    credits = models.IntegerField()

    def __str__(self):
        return self.course_name

class Enrollment(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    enrollment_date = models.DateField(auto_now_add=True)
    grade = models.CharField(max_length=2, blank=True)

    class Meta:
        unique_together = ('student', 'course')

    def __str__(self):
        return f"{self.student.name} enrolled in {self.course.course_name}"

# Usage in views:
# student = Student.objects.get(id=1)
# courses = student.courses.all()
# student.courses.add(course_instance)
```

## Comparison with Other Relationships

| Relationship Type | Example             | Implementation                     |
| ----------------- | ------------------- | ---------------------------------- |
| **One-to-One**    | Person → Passport   | Foreign key with UNIQUE constraint |
| **One-to-Many**   | Author → Books      | Foreign key in "many" table        |
| **Many-to-Many**  | Students ↔ Courses | Junction/bridge table required     |

## Best Practices

1. **Use Composite Primary Key**: `(student_id, course_id)` in junction table
2. **Add Metadata**: Include additional columns like `enrollment_date`, `grade`
3. **Index Foreign Keys**: Improve query performance
4. **Enforce Uniqueness**: Prevent duplicate relationships
5. **Use Cascade Deletes**: Define behaviour when parent records are deleted

---

## References

- [Many-to-Many Relationship - Wikipedia](<https://en.wikipedia.org/wiki/Many-to-many_(data_model)>)
- [SQLAlchemy Documentation](https://docs.sqlalchemy.org/en/14/orm/basic_relationships.html)
- [Database Design Fundamentals](https://www.lucidchart.com/pages/database-diagram/database-design)

---

## References
