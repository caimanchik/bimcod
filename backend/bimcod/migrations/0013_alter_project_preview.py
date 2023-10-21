# Generated by Django 4.2.6 on 2023-10-21 16:11

import bimcod.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("bimcod", "0012_project_preview"),
    ]

    operations = [
        migrations.AlterField(
            model_name="project",
            name="preview",
            field=models.ImageField(
                upload_to=bimcod.models.get_upload_path_project_preview,
                verbose_name="Превью",
            ),
        ),
    ]