from django.contrib import admin
from .models import Event, Guest, AgendaItem, BudgetItem, Feedback

class EventAdmin(admin.ModelAdmin):
    list_display = ('title', 'start_date', 'end_date', 'location', 'max_guests', 'is_active')
    list_filter = ('is_active', 'start_date')
    search_fields = ('title', 'location')

class GuestAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone_number', 'rsvp_status')
    list_filter = ('rsvp_status',)
    search_fields = ('name', 'email')

class AgendaItemAdmin(admin.ModelAdmin):
    list_display = ('title', 'start_time', 'end_time')
    list_filter = ('start_time',)
    search_fields = ('title',)

class BudgetItemAdmin(admin.ModelAdmin):
    list_display = ('title', 'amount')
    list_filter = ('amount',)
    search_fields = ('title',)

class FeedbackAdmin(admin.ModelAdmin):
    list_display = ('event', 'guest', 'rating')
    list_filter = ('rating',)
    search_fields = ('event__title', 'guest__name')

admin.site.register(Event, EventAdmin)
admin.site.register(Guest, GuestAdmin)
admin.site.register(AgendaItem, AgendaItemAdmin)
admin.site.register(BudgetItem, BudgetItemAdmin)
admin.site.register(Feedback, FeedbackAdmin)
