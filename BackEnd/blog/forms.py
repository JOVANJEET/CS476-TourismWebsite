from django import forms

from .models import BlogPostForm


class BlogPostForm(forms.ModelForm):
    class Meta:
        model = BlogPostForm
        fields = ['title', 'body', 'author', 'date']
