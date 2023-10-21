# Generated by Django 4.2.6 on 2023-10-19 07:52

import bimcod.models
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("bimcod", "0002_alter_imageproject_image"),
    ]

    operations = [
        migrations.CreateModel(
            name="LinearProject",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("field", models.JSONField(verbose_name="Коэффициенты и цены")),
            ],
            options={"verbose_name_plural": "Линейный объект/Проектная документация",},
        ),
        migrations.AlterModelOptions(
            name="imageproject", options={"verbose_name_plural": "Фотографии проектов"},
        ),
        migrations.AlterModelOptions(
            name="newsobject", options={"verbose_name_plural": "Новости"},
        ),
        migrations.AlterModelOptions(
            name="project", options={"verbose_name_plural": "Проекты"},
        ),
        migrations.AlterField(
            model_name="imageproject",
            name="alt",
            field=models.CharField(
                max_length=30, verbose_name="Замещающий текст про ошибке загрузки фото"
            ),
        ),
        migrations.AlterField(
            model_name="imageproject",
            name="image",
            field=models.ImageField(
                unique=True,
                upload_to=bimcod.models.get_upload_path_project,
                verbose_name="Фотография",
            ),
        ),
        migrations.AlterField(
            model_name="imageproject",
            name="project",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="images",
                to="bimcod.project",
                verbose_name="Принадлежит проекту",
            ),
        ),
        migrations.AlterField(
            model_name="newsobject",
            name="description",
            field=models.TextField(verbose_name="Содержание"),
        ),
        migrations.AlterField(
            model_name="newsobject",
            name="image",
            field=models.ImageField(
                unique=True, upload_to="news/", verbose_name="Фотография"
            ),
        ),
        migrations.AlterField(
            model_name="newsobject",
            name="title",
            field=models.CharField(max_length=100, verbose_name="Заголовок"),
        ),
        migrations.AlterField(
            model_name="project",
            name="description",
            field=models.TextField(verbose_name="Описание"),
        ),
        migrations.AlterField(
            model_name="project",
            name="title",
            field=models.CharField(max_length=100, verbose_name="Название"),
        ),
    ]