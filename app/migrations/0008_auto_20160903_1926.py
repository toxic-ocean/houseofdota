# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2016-09-03 19:26
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0007_auto_20160902_1819'),
    ]

    operations = [
        migrations.RenameField(
            model_name='heroesstatistics',
            old_name='hero_combination',
            new_name='hero_bundle',
        ),
        migrations.AddField(
            model_name='heroesstatistics',
            name='bundle_size',
            field=models.IntegerField(default=1),
        ),
    ]
