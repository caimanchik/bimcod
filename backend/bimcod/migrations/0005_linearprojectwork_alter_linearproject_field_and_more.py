# Generated by Django 4.2.6 on 2023-10-19 08:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("bimcod", "0004_linearwork_alter_linearproject_field"),
    ]

    operations = [
        migrations.CreateModel(
            name="LinearProjectWork",
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
                    "field",
                    models.JSONField(
                        default={
                            "Коэффициент": 1.4,
                            "Разделы": [
                                {"Название": "Генеральный план", "Цена": 19324},
                                {
                                    "Название": "Система электроснабжения. Наружное электроснабжение",
                                    "Цена": 89294,
                                },
                                {
                                    "Название": "Система водоснабжения и водоотведения. Наружные сети",
                                    "Цена": 64783,
                                },
                                {"Название": "ВОЛС", "Цена": 48380},
                            ],
                        },
                        verbose_name="Проектная и рабочая документация: Коэффициенты и цены",
                    ),
                ),
            ],
            options={
                "verbose_name_plural": "Линейный объект/Проектная и рабочая документация",
            },
        ),
        migrations.AlterField(
            model_name="linearproject",
            name="field",
            field=models.JSONField(
                default={
                    "Коэффициент": 1.1,
                    "Разделы": [
                        {"Название": "Пояснительная записка", "Цена": 10000},
                        {"Название": "Проект полосы отвода", "Цена": 342132},
                        {
                            "Название": "Технологические и конструктивные решения линейного объекта. Искусственные сооружения",
                            "Цена": 90432,
                        },
                        {
                            "Название": "Здания, строения и сооружения, входящие в инфраструктуру линейного объекта",
                            "Цена": 58042,
                        },
                        {
                            "Название": "Проект организации строительства",
                            "Цена": 342132,
                        },
                        {
                            "Название": "Проект организации работ по сносу (демонтажу) линейного объекта",
                            "Цена": 93022,
                        },
                        {
                            "Название": "Мероприятия по охране окружающей среды",
                            "Цена": 53218,
                        },
                        {
                            "Название": "Мероприятия по Раздел 8. «Мероприятия по обеспечению пожарной безопасности",
                            "Цена": 92055,
                        },
                        {"Название": "Сметы", "Цена": 89294},
                    ],
                },
                verbose_name="Проектная документация: Коэффициенты и цены",
            ),
        ),
        migrations.AlterField(
            model_name="linearwork",
            name="field",
            field=models.JSONField(
                default={
                    "Коэффициент": 1.4,
                    "Разделы": [
                        {"Название": "Генеральный план", "Цена": 19324},
                        {
                            "Название": "Система электроснабжения. Наружное электроснабжение",
                            "Цена": 89294,
                        },
                        {
                            "Название": "Система водоснабжения и водоотведения. Наружные сети",
                            "Цена": 64783,
                        },
                        {"Название": "ВОЛС", "Цена": 48380},
                    ],
                },
                verbose_name="Рабочая документация: Коэффициенты и цены",
            ),
        ),
    ]
