from django.db import models
from django.contrib.auth.models import User

class Event(models.Model):
    # Basic Event Information
    host = models.ForeignKey(User, on_delete=models.CASCADE, related_name='hosted_events')
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    location = models.CharField(max_length=300)
    max_guests = models.PositiveIntegerField()

    # Status
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.title

class Guest(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='guests')
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    rsvp_status = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.name} ({self.email})"

class AgendaItem(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='agenda_items')
    title = models.CharField(max_length=200)
    description = models.TextField()
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()

    def __str__(self):
        return self.title

class BudgetItem(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='budget_items')
    title = models.CharField(max_length=200)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.title

class Feedback(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='feedbacks')
    guest = models.ForeignKey(Guest, on_delete=models.CASCADE)
    comment = models.TextField()
    rating = models.PositiveIntegerField(default=5)

    def __str__(self):
        return f"Feedback by {self.guest.name} for {self.event.title}"

