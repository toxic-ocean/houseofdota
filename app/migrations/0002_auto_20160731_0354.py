# -*- coding: utf-8 -*-
# Generated by Django 1.9.8 on 2016-07-31 03:54
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='slot',
            name='items',
            field=models.CommaSeparatedIntegerField(max_length=255),
        ),
    ]
