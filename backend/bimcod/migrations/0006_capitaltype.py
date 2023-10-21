# Generated by Django 4.2.6 on 2023-10-19 15:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("bimcod", "0005_linearprojectwork_alter_linearproject_field_and_more"),
    ]

    operations = [
        migrations.CreateModel(
            name="CapitalType",
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
                (
                    "public",
                    models.IntegerField(
                        default=100, verbose_name="Коэффициент общественных зданий"
                    ),
                ),
                (
                    "living",
                    models.IntegerField(
                        default=200, verbose_name="Коэффициент жилых зданий"
                    ),
                ),
                (
                    "prom",
                    models.IntegerField(
                        default=250,
                        verbose_name="Коэффициент промышленные объектов и сооружений",
                    ),
                ),
            ],
            options={
                "verbose_name_plural": "Объект капитального строительства/Тип строительства",
            },
        ),
    ]
