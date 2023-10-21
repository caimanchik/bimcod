from django.db import models

from bimcod.json_init.capital_project import capital_project
from bimcod.json_init.capital_project_work import capital_project_work
from bimcod.json_init.capital_work import capital_work
from bimcod.json_init.linear_project import linear_project
from bimcod.json_init.linear_project_work import linear_project_work
from bimcod.json_init.linear_work import linear_work


def get_upload_path_project(instance, filename):
    return f'projects/{instance.project.id}/{filename}'


class Project(models.Model):
    class Meta:
        verbose_name_plural = 'Проекты'

    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100, verbose_name="Название")
    description = models.TextField(verbose_name="Описание")

    def __str__(self):
        return self.title


class ImageProject(models.Model):
    class Meta:
        verbose_name_plural = 'Фотографии проектов'

    image = models.ImageField(upload_to=get_upload_path_project, unique=True, verbose_name="Фотография")
    alt = models.CharField(max_length=30, verbose_name="Замещающий текст про ошибке загрузки фото")
    project = models.ForeignKey(
        Project,
        related_name='images',
        on_delete=models.CASCADE,
        verbose_name="Принадлежит проекту")

    def __str__(self):
        return f'Проект: {self.project.title} / Фотография: {self.image.name.split("/")[-1]}'


class NewsObject(models.Model):
    class Meta:
        verbose_name_plural = 'Новости'

    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100, verbose_name="Заголовок")
    description = models.TextField(verbose_name="Содержание")
    image = models.ImageField(upload_to='news/', unique=True, verbose_name="Фотография")

    def __str__(self):
        return self.title


class LinearProject(models.Model):
    class Meta:
        verbose_name_plural = 'Линейный объект/Проектная документация'

    field = models.JSONField(verbose_name='Проектная документация: Коэффициенты и цены', default=linear_project)

    def __str__(self):
        return 'Линейный объект/Проектная документация'


class LinearWork(models.Model):
    class Meta:
        verbose_name_plural = 'Линейный объект/Рабочая документация'

    field = models.JSONField(verbose_name='Рабочая документация: Коэффициенты и цены', default=linear_work)

    def __str__(self):
        return 'Линейный объект/Рабочая документация'


class LinearProjectWork(models.Model):
    class Meta:
        verbose_name_plural = 'Линейный объект/Проектная и рабочая документация'

    field = models.JSONField(verbose_name='Проектная и рабочая документация: Коэффициенты и цены', default=linear_project_work)

    def __str__(self):
        return 'Линейный объект/Проектная и рабочая документация'


class CapitalType(models.Model):
    class Meta:
        verbose_name_plural = 'Объект капитального строительства/Тип строительства'

    public = models.FloatField(verbose_name='Коэффициент общественных зданий', default=100.1)
    living = models.FloatField(verbose_name='Коэффициент жилых зданий', default=200.1)
    prom = models.FloatField(verbose_name='Коэффициент промышленные объектов и сооружений', default=250.1)

    def __str__(self):
        return 'Объект капитального строительства/Тип строительства'


class CapitalProject(models.Model):
    class Meta:
        verbose_name_plural = 'Объект капитального строительства/Проектная документация'

    field = models.JSONField(verbose_name='Проектная документация: Коэффициенты и цены', default=capital_project)

    def __str__(self):
        return 'Линейный объект/Проектная документация'


class CapitalWork(models.Model):
    class Meta:
        verbose_name_plural = 'Объект капитального строительства/Рабочая документация'

    field = models.JSONField(verbose_name='Рабочая документация: Коэффициенты и цены', default=capital_work)

    def __str__(self):
        return 'Объект капитального строительства/Рабочая документация'


class CapitalProjectWork(models.Model):
    class Meta:
        verbose_name_plural = 'Объект капитального строительства/Проектная и рабочая документация'

    field = models.JSONField(verbose_name='Проектная и рабочая документация: Коэффициенты и цены', default=capital_project_work)

    def __str__(self):
        return 'Объект капитального строительства/Проектная и рабочая документация'
