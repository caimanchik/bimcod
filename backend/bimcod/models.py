from django.db import models

from bimcod.json_init.capital_project import capital_project
from bimcod.json_init.capital_project_work import capital_project_work
from bimcod.json_init.capital_work import capital_work
from bimcod.json_init.linear_project import linear_project
from bimcod.json_init.linear_project_work import linear_project_work
from bimcod.json_init.linear_work import linear_work

import xml.etree.ElementTree as ET
from datetime import datetime

from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver


def get_upload_path_project_image(instance, filename):
    return f'projects/{instance.project.id}/{filename}'


def get_upload_path_project_preview(instance, filename):
    return f'projects/{instance.id}/preview/{filename}'


class Project(models.Model):
    class Meta:
        verbose_name_plural = 'Проекты'

    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100, verbose_name="Название")
    preview = models.ImageField(verbose_name='Превью', upload_to=get_upload_path_project_preview)
    description = models.TextField(verbose_name="Описание")

    def __str__(self):
        return self.title


@receiver(post_save, sender=Project)
@receiver(post_delete,sender=Project)
def generate_xml(sender, **kwargs):
    ET.register_namespace("", "http://www.sitemaps.org/schemas/sitemap/0.9")
    f = ET.parse('/var/www/u1814431/data/www/api.bimcod.ru/static/sitemap.xml')
    et = f.getroot()

    for id in map(lambda x: x.id, Project.objects.all()):
        url = ET.SubElement(et, 'url')

        loc = ET.SubElement(url, 'loc')
        loc.text = f"https://bimcod.ru/project.html?id={id}"

        lastmod = ET.SubElement(url, 'lastmod')
        lastmod.text = datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%S") + '+05:00'

        changefreq = ET.SubElement(url, 'changefreq')
        changefreq.text = "weekly"

        priority = ET.SubElement(url, 'priority')
        priority.text = "0.8"

    ET.ElementTree(et).write('/var/www/u1814431/data/www/bimcod.ru/sitemap.xml', encoding='utf-8', xml_declaration=True)


class ImageProject(models.Model):
    class Meta:
        verbose_name_plural = 'Фотографии проектов'

    image = models.ImageField(upload_to=get_upload_path_project_image, unique=True, verbose_name="Фотография")
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
