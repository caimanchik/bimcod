# Generated by Django 4.2.6 on 2023-10-19 15:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("bimcod", "0008_alter_capitaltype_living_alter_capitaltype_prom_and_more"),
    ]

    operations = [
        migrations.CreateModel(
            name="CapitalProject",
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
                            "Коэффициент": 1.1,
                            "Разделы": [
                                {"Название": "Пояснительная записка", "Цена": 22324},
                                {
                                    "Название": "Схема планировочной организации земельного участка.",
                                    "Цена": 74732,
                                },
                                {"Название": "Архитектурные решения", "Цена": 89218},
                                {
                                    "Название": "Конструктивные и объемно-планировочные решения",
                                    "Цена": 78923,
                                },
                                {"Название": "Система электроснабжения", "Цена": 90124},
                                {"Название": "Система водоотведения", "Цена": 98239},
                                {"Название": "Система водоснабжения", "Цена": 65283},
                                {
                                    "Название": "Отопление, вентиляция, кондиционирование, тепловые сети",
                                    "Цена": 88753,
                                },
                                {"Название": "Сети связи", "Цена": 89524},
                                {"Название": "Сети связи (АПС, СОУЭ)", "Цена": 77328},
                                {"Название": "Технологические решения", "Цена": 87523},
                                {
                                    "Название": "Проект организации строительства",
                                    "Цена": 73289,
                                },
                                {
                                    "Название": "Проект организации демонтажа/сноса",
                                    "Цена": 84329,
                                },
                                {
                                    "Название": "Перечень мероприятий по охране окружающей среды",
                                    "Цена": 97728,
                                },
                                {
                                    "Название": "Мероприятия по обеспечению пожарной безопасности",
                                    "Цена": 22324,
                                },
                                {"Название": "Энергоэффективность", "Цена": 12129},
                                {
                                    "Название": "Мероприятия по обеспечению   доступа инвалидов к объекту капитального строительства",
                                    "Цена": 74822,
                                },
                                {"Название": "Сметы", "Цена": 23483},
                            ],
                        },
                        verbose_name="Проектная документация: Коэффициенты и цены",
                    ),
                ),
            ],
            options={
                "verbose_name_plural": "Объект капитального строительства/Проектная документация",
            },
        ),
    ]