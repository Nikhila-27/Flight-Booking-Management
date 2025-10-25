from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(AbstractUser):
    is_approved = models.BooleanField(default=False)

class Flight(models.Model):
    flight_number = models.CharField(max_length=20)
    origin = models.CharField(max_length=100)
    destination = models.CharField(max_length=100)
    date = models.DateField()
    time = models.TimeField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    seats_available = models.PositiveIntegerField(default=0)
    status = models.CharField(max_length=20, default='On-Time')
    image = models.ImageField(upload_to='flights/', null=True, blank=True)

class Booking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    flight = models.ForeignKey(Flight, on_delete=models.CASCADE)
    seats = models.PositiveIntegerField(default=1)
    payment_status = models.CharField(max_length=20, default='Pending')
    booked_on = models.DateTimeField(auto_now_add=True)





