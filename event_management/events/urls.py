from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EventViewSet, GuestViewSet, AgendaItemViewSet, BudgetItemViewSet, FeedbackViewSet

router = DefaultRouter()
router.register(r'events', EventViewSet)
router.register(r'guests', GuestViewSet)
router.register(r'agendaitems', AgendaItemViewSet)
router.register(r'budgetitems', BudgetItemViewSet)
router.register(r'feedbacks', FeedbackViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
