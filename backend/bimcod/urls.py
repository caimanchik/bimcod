from django.urls import path

from bimcod.views import NewsList, ProjectsList, GetProjectById, GetCalculator, SendUserResponse, GetAboutInfo

urlpatterns = [
    path("v1/newsList/", NewsList.as_view()),
    path("v1/projectsList/", ProjectsList.as_view()),
    path("v1/project/", GetProjectById.as_view()),
    path("v1/getCalculator/", GetCalculator.as_view()),
    path("v1/sendUserResponse", SendUserResponse.as_view()),
    path("v1/getAboutSections", GetAboutInfo.as_view()),
]