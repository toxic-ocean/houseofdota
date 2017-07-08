# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2017-07-08 04:30
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0016_winningbundlestatistics'),
    ]

    operations = [
        migrations.AddField(
            model_name='bundleassociationrules',
            name='iteration',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='counterassociationrules',
            name='iteration',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='patchstatistics',
            name='iteration',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='pickassociationrules',
            name='iteration',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='winningbundlestatistics',
            name='iteration',
            field=models.IntegerField(default=0),
        ),
    ]
