from rest_framework import serializers
from .models import User, Flight, Booking
from django.contrib.auth.hashers import make_password

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'is_approved']

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)

class FlightSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flight
        fields = '__all__'


class BookingSerializer(serializers.ModelSerializer):
    flight = FlightSerializer(read_only=True)  # full flight details
    flight_id = serializers.PrimaryKeyRelatedField(
        queryset=Flight.objects.all(), source='flight', write_only=True
    )

    class Meta:
        model = Booking
        fields = ['id', 'user', 'flight', 'flight_id', 'seats', 'payment_status', 'booked_on']
        read_only_fields = ['user', 'payment_status', 'booked_on']