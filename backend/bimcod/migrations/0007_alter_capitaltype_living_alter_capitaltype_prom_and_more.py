# Generated by Django 4.2.6 on 2023-10-19 15:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("bimcod", "0006_capitaltype"),
    ]

    operations = [
        migrations.AlterField(
            model_name="capitaltype",
            name="living",
            field=models.FloatField(
                default=200, verbose_name="Коэффициент жилых зданий"
            ),
        ),
        migrations.AlterField(
            model_name="capitaltype",
            name="prom",
            field=models.FloatField(
                default=250,
                verbose_name="Коэффициент промышленные объектов и сооружений",
            ),
        ),
        migrations.AlterField(
            model_name="capitaltype",
            name="public",
            field=models.FloatField(
                default=100, verbose_name="Коэффициент общественных зданий"
            ),
        ),
    ]
